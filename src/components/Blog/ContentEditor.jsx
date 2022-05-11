import "../../assets/scss/styles/editors.css";
import PropTypes from "prop-types";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import FullEditor from "@blowstack/ckeditor5-full-free-build";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";

const ContentEditor = (props) => {
    const {data, setData, readMode} = props;
    const {auth} = useAuth();

    const [imageId, setImageID] = useState([]);

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("image", file);
                        let headers = new Headers();
                        headers.append("Authorization", `Bearer ${auth?.token?.access}`);
                        fetch(`${baseURL.blog_image_upload}`, {
                            method: "post",
                            body: body
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                console.log(res);
                                resolve({
                                    default: res.url
                                });
                                setImageID((prev) => [
                                    ...prev,
                                    res.image_id
                                ])
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
            }
        };
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    const editorConfig = {
        toolbar: {
            items: [
                "undo", "redo",
                "fontsize", "fontColor", "fontBackgroundColor", "|",
                "heading", "|", "alignment", "|",
                "bold", "italic", "|", "link", "|",
                "bulletedList", "numberedList",
                "insertTable", "mergeTableCells", "|",
                "insertImage", "codeBlock", "|",
                "code", "HorizontalLine",
                "SpecialCharacters", "ImageResize",
                "pageBreak",
            ],
            shouldNotGroupWhenFull: false
        },
        removePlugins: ['Title'],
        extraPlugins: [uploadPlugin],
    }

    useEffect(() => {
        if (setData) {
            setData((prev) => {
                return {
                    ...prev,
                    image_ids: imageId
                }
            })
        }
    }, [imageId])
    return (
        <>
            <CKEditor
                editor={FullEditor}
                config={editorConfig}
                data={data ? data : ""}
                onReady={editor => {
                    console.log('ready editor')
                    console.log(editor.config._config.plugins.map(item => item.pluginName))
                    console.log(Array.from(editor.ui.componentFactory.names()));
                    console.log('isReadOnly', editor.isReadOnly)

                    const toolbarContainer = editor.ui.view.stickyPanel;
                    editor.isReadOnly = !!readMode;

                    if (editor.isReadOnly) {
                        editor.ui.view.top.remove(toolbarContainer);
                        editor.ui.view.editable.element.classList.add('p-0');
                        editor.ui.view.editable.element.classList.add('border-0');
                    }
                }}
                onChange={(event, editor) => {
                    console.log('change')
                    const data = editor.getData();
                    if (setData) {
                        setData((prev) => {
                            return {
                                ...prev,
                                content: data
                            }
                        })
                    }

                }}
                onFocus={(event, editor) => {
                    console.log('focus')
                    editor.ui.view.editable.element.style.minHeight = "180px"
                }}
                onBlur={(event, editor) => {
                    console.log('blurred')
                }}
            />
        </>
    )
}
ContentEditor.propTypes = {
    readMode: PropTypes.bool,
};
export default ContentEditor;
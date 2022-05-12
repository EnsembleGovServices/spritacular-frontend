import "../../assets/scss/styles/editors.css";
import PropTypes from "prop-types";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import FullEditor from "@blowstack/ckeditor5-full-free-build";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";

const ContentEditor = (props) => {
    const {data, setData, readMode, editorData} = props;
    const {auth} = useAuth();

    const [imageId, setImageID] = useState([]);
    const [changeData, setChangeData] = useState(false);
    const [editorImage, setEditorImage] = useState([]);

    function uploadAdapter(loader) {
        setChangeData(false);
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
                                    {id: res.image_id, url: res.url}
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
    }, [imageId, editorImage])

    // For clearing image from the array
    useEffect(() => {
        if (changeData && imageId) {
            const updatedItem = editorData?.image_ids?.filter(item => {
                return editorImage.includes(item.url);
            }).map((item) => {
                return item;
            });
            setImageID(updatedItem);
        }
    }, [editorImage, changeData])

    return (
        <>
            <CKEditor
                editor={FullEditor}
                config={editorConfig}
                data={data ? data : ""}
                then={response => {
                    console.log(response);
                }}
                onReady={editor => {
                    // console.log('ready editor')
                    // console.log(editor.config._config.plugins.map(item => item.pluginName))
                    // console.log(Array.from(editor.ui.componentFactory.names()));
                    // console.log('isReadOnly', editor.isReadOnly)
                    // editor.ui.view.editable.element.style.minHeight = "180px"
                    const toolbarContainer = editor.ui.view.stickyPanel;
                    editor.isReadOnly = !!readMode;

                    if (editor.isReadOnly) {
                        editor.ui.view.top.remove(toolbarContainer);
                        editor.ui.view.editable.element.classList.add('p-0');
                        editor.ui.view.editable.element.classList.add('border-0');
                    }
                }}
                onChange={(event, editor) => {
                    setChangeData(false);
                    // console.log('event', event)
                    const data = editor.getData();

                    editor.model.document.on('change:data', () => {
                        setChangeData(true);
                    });
                    const avlImg = Array.from(new DOMParser().parseFromString(editor.getData(), 'text/html')
                        .querySelectorAll('img'))
                        .map(img => img.getAttribute('src'))

                    setEditorImage(avlImg);

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
                    // console.log('focus')
                    // editor.ui.view.editable.element.style.minHeight = "180px"
                }}
                onBlur={(event, editor) => {
                    // editor.ui.view.editable.element.style.minHeight = "180px"
                    // console.log('blurred')
                }}
            />
        </>
    )
}
ContentEditor.propTypes = {
    readMode: PropTypes.bool,
};
export default ContentEditor;
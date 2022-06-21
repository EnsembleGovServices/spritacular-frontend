import "../../assets/scss/styles/editors.css";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import FullEditor from "@blowstack/ckeditor5-full-free-build";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const ContentEditor = (props) => {
    const {data, setData, editorData, setLoading, setReadMode, readMode, readOnly} = props;
    const {auth} = useAuth();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') !== "edit";

    const [imageId, setImageID] = useState([]);
    const [changeData, setChangeData] = useState(false);
    const [editorImage, setEditorImage] = useState([]);

    const [fakeLoading, setFakeLoading] = useState(true);


    function uploadAdapter(loader) {
        setChangeData(false);
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    setLoading(true);
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
                                // console.log(res);
                                setLoading(false);
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
                "fontFamily", "fontsize", "fontColor", "fontBackgroundColor", "|",
                "heading", "|", "alignment", "|",
                "bold", "italic", "|", "link", "|",
                "bulletedList", "numberedList",
                "insertTable", "mergeTableCells", "|",
                "insertImage", "mediaEmbed", "codeBlock", "|",
                "code", "HorizontalLine",
                "ImageResize",
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editorImage, changeData])

    // SetEditMode
    useEffect(() => {
        if (setReadMode) {
            setReadMode(mode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    useEffect(() => {
        setTimeout(function () {
            setFakeLoading(false);
        }, 1000)
    }, [fakeLoading])

    return (
        <>
            {fakeLoading ? <div className="spinner">
                <div className="loading-1"></div>
                <div className="loading-2"></div>
                <div className="loading-3"></div>
            </div> : ''}
            <div className={fakeLoading ? 'd-none' : 'd-block'}>
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
                        editor.isReadOnly = readMode ? readMode : readOnly;

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
            </div>
        </>

    )
}
ContentEditor.propTypes = {};
export default ContentEditor;
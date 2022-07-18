import "../../assets/scss/styles/editors.css";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import FullEditor from "@blowstack/ckeditor5-full-free-build";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";

const ContentEditor = (props) => {
    const {data, setData, editorData, setLoading, setReadMode, readMode, readOnly, dynamicPageProps} = props;
    const {auth} = useAuth();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') !== "edit";

    const [imageId, setImageID] = useState([]);
    const [changeData, setChangeData] = useState(false);
    const [editorImage, setEditorImage] = useState([]);

    const [fakeLoading, setFakeLoading] = useState(true);

    const ckEditorContentRef = useRef(null);

    function uploadAdapter(loader) {
        setChangeData(false);
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    setLoading(true);
                    loader.file.then((file) => {
                        // console.log(file);
                        body.append("image", file);
                        let headers = new Headers();
                        headers.append("Authorization", `Bearer ${auth?.token?.access}`);
                        fetch(`${baseURL.blog_image_upload}`, {
                            method: "post",
                            body: body
                        })
                            .then((res) => res.json())
                            .then((res) => {
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

    // CkEditor plugin
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    // To set menu and tools for editor
    const editorConfig = {
        heading: {
            options: [
                {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'heading1'},
                {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'heading2'},
                {model: 'heading3', view: 'h3', title: 'Heading 3', class: 'heading3'},
                {model: 'heading4', view: 'h4', title: 'Heading 4', class: 'heading4'},
                {model: 'heading5', view: 'h5', title: 'Heading 5', class: 'heading5'},
                {model: 'paragraph', view: 'p', title: 'Paragraph', class: 'paragraph'},
                {
                    model: 'addButton',
                    view: {
                        name: 'p',
                        classes: 'editor-btn'
                    },
                    title: 'Add Button',
                    class: 'btn',
                    converterPriority: 'high'
                },
            ]
        },

        link: {
            // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
            addTargetToExternalLinks: true,
            decorators: {
                defaultProtocol: 'https://',
            }
        },
        placeholder: 'Type or paste your content here!',
        toolbar: {
            items: [
                "undo", "redo",
                "fontFamily", "fontsize", "fontColor", "fontBackgroundColor", "|",
                "heading", "|", "alignment", "|",
                "bold", "italic", "|", "link", "|",
                "bulletedList", "numberedList",
                "insertTable", "mergeTableCells", "|",
                "insertImage", "mediaEmbed", "|",
                "HorizontalLine",
                "ImageResize",
                "pageBreak",
            ],
            shouldNotGroupWhenFull: false,
        },

        removePlugins: ['Title'],
        extraPlugins: [uploadPlugin],
        allowedContent: true
    }

    // Set image data in state.
    useEffect(() => {
        if (setData) {
            setData((prev) => {
                return {
                    ...prev,
                    image_ids: imageId
                }
            })
        }
        return () => {
            if (setData) {
                setData((prev) => {
                    return {
                        ...prev,
                        editorData
                    }
                })
            }
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


    useLayoutEffect(() => {
        const ckEditorDynamicPage = ckEditorContentRef.current.editor;
        const toolbarContainer = ckEditorDynamicPage?.ui.view.stickyPanel;
        if (ckEditorDynamicPage) {
            ckEditorDynamicPage.isReadOnly = dynamicPageProps;
            if (ckEditorDynamicPage.isReadOnly) {
                ckEditorDynamicPage.ui.view.top.remove(toolbarContainer);
            } else {
                ckEditorDynamicPage.ui.view.top.add(toolbarContainer);
            }
        }
    }, [dynamicPageProps])


    // Show/hide fake Loading on image select in editor
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
                    ref={ckEditorContentRef}
                    editor={FullEditor}
                    config={editorConfig}
                    data={data ? data : ""}
                    then={response => {
                        process.env.NODE_ENV === "development" && console.log('ContentEditor: ', response);
                    }}
                    onReady={editor => {
                        if (editor) {
                            const toolbarContainer = editor.ui.view.stickyPanel;
                            editor.isReadOnly = readMode ? readMode : (readOnly ? readOnly : dynamicPageProps);

                            if (editor.isReadOnly) {
                                editor.ui.view.top.remove(toolbarContainer);
                                editor.ui.view.editable.element.classList.add('p-0');
                                editor.ui.view.editable.element.classList.add('border-0');
                            }
                        }
                    }}
                    onChange={(event, editor) => {
                        setChangeData(false);
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
                />
            </div>
        </>

    )
}
ContentEditor.propTypes = {};
export default ContentEditor;
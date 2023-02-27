import "../../../assets/scss/styles/editors.css";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import FullEditor from "@blowstack/ckeditor5-full-free-build";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {editorCustomConfig} from "../../../helpers/editorHelper";
import useAuth from "../../../hooks/useAuth";

const TeamContentEditor = (props) => {
    const {data, setData, editorData, setLoading, setReadMode, readMode, readOnly, dynamicPageProps} = props;
    const {auth} = useAuth();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') !== "edit";

    const [changeData, setChangeData] = useState(false);

    const [fakeLoading, setFakeLoading] = useState(true);

    const ckEditorContentRef = useRef(null);


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
            ]
        },

        link: {
            // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
            addTargetToExternalLinks: true,
            decorators: {
                defaultProtocol: 'https://',
            }
        },
        placeholder: '',
        toolbar: {
            items: editorCustomConfig.toolbar.dynPages,
            shouldNotGroupWhenFull: false,
        },

        removePlugins: ['Title'],
        allowedContent: true
    }


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
TeamContentEditor.propTypes = {};
export default TeamContentEditor;
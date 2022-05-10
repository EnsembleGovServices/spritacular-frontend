import "../../assets/scss/styles/editors.css";
import PropTypes from "prop-types";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import FullEditor from 'ckeditor5-build-full';

const ContentEditor = (props) => {
    const {data, setData, readMode} = props;

    const API_URL = "http://localhost:8000/testing_upload";
    const UPLOAD_ENDPOINT = "upload_files";

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("images", file);
                        // let headers = new Headers();
                        // headers.append("Origin", "http://localhost:3000");
                        fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                            method: "post",
                            body: body
                            // mode: "no-cors"
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                resolve({
                                    default: `${API_URL}/${res.filename}`
                                });
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
                "code", "codeBlock", "|",
                "imageUpload", "insertImage", "HorizontalLine",
                "SpecialCharacters", "ImageResize",
                "pageBreak",
            ],
            shouldNotGroupWhenFull: false
        },
        extraPlugins: [uploadPlugin]
    }

    return (
        <CKEditor
            editor={FullEditor}
            config={editorConfig}
            data={data ? data : ""}
            onReady={editor => {
                const toolbarContainer = editor.ui.view.stickyPanel;
                console.log(editor.config._config.plugins.map(item => item.pluginName))
                editor.isReadOnly = !!readMode;
                console.log(Array.from(editor.ui.componentFactory.names()));
                console.log('isReadOnly', editor.isReadOnly)

                if (editor.isReadOnly) {
                    editor.ui.view.top.remove(toolbarContainer);
                    editor.ui.view.editable.element.classList.add('p-0');
                    editor.ui.view.editable.element.classList.add('border-0');
                }
            }}
            onChange={(event, editor) => {
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
        />
    )
}
ContentEditor.propTypes = {
    readMode: PropTypes.bool,
};
export default ContentEditor;
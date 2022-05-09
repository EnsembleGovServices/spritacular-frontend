import {CKEditor} from "@ckeditor/ckeditor5-react";
import FullEditor from 'ckeditor5-build-full'
import {editorCustomConfig} from "../../helpers/editorHelper";
import PropTypes from "prop-types";
import {useLayoutEffect, useState} from "react";
import Loader from "../Shared/Loader";

const ContentEditor = (props) => {
    const {data, setData, readMode} = props;
    const [loading, setLoading] = useState(true);
    const editorConfig = {
        toolbar: editorCustomConfig,
    }

    useLayoutEffect(() => {
        setTimeout(function () {
            setLoading(!loading)
        }, 500)
    }, [readMode])
    return (
        loading ? <Loader/> : (
            <CKEditor
                editor={FullEditor}
                config={editorConfig}
                data={data ? data : ""}
                onReady={editor => {
                    const toolbarContainer = editor.ui.view.stickyPanel;

                    if (readMode) {
                        editor.isReadOnly = true;
                    } else {
                        editor.isReadOnly = false;
                    }

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
    )
}
ContentEditor.propTypes = {
    readMode: PropTypes.bool,
};
export default ContentEditor;
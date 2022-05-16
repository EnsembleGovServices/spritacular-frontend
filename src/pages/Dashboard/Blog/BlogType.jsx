import {FormGroup, Input, Label} from "reactstrap";

const BlogType = (props) => {
    const {blogType, handleInput, type, update} = props;
    const types = [
        {
            name: 'Blog',
            value: 1
        },
        {
            name: 'Tutorial',
            value: 2
        }
    ]
    return (
        <FormGroup>
            <Label for="ChooseType">
                Choose Type
            </Label>
            <Input
                className={!!update ? "disabled" : ""}
                id="article_type"
                name="article_type"
                type="select"
                title={update ? "Disabled in update mode" : "Select Type"}
                value={blogType === "1" || type === "blog" ? 1 : 2}
                disabled={!!update}
                onChange={(e) => handleInput(e)}
            >
                {types?.map((item, index) => {
                    return (
                        <option key={index}
                                value={item?.value}>{item?.name}</option>
                    )
                })}
            </Input>
        </FormGroup>
    )
}
export default BlogType;
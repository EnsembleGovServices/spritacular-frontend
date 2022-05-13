import {FormGroup, Input, Label} from "reactstrap";

const BlogType = (props) => {
    const {blogType, handleInput} = props;
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
                id="article_type"
                name="article_type"
                type="select"
                value={blogType === "1" ? 1 : 2}
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
import {FormGroup, Input, Label} from "reactstrap";

const BlogCategory = (props) => {
    const {category, handleInput} = props;
    return (
        <FormGroup>
            <Label for="title">
                Choose Category
            </Label>
            <Input
                id="category"
                name="category"
                type="select"
                onChange={(e) => handleInput(e)}
            >
                {category && category?.map((item, index) => {
                    return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })}
            </Input>
        </FormGroup>
    )
}
export default BlogCategory;
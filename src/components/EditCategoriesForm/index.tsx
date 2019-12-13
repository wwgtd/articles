import React from 'react'
import './style.css'
import { ICategoriesState } from '../../types/redux/category'
import { connect } from 'react-redux'
import { api } from '../../actions/api'


enum DisplayStatus {
  CreateNewCategory = 0,
  EditCategory
}

interface IEditCategoriesFormProps {
  categories: ICategoriesState,
  create: (newName: string) => void,
  update: (payload: {id: number, newName: string}) => void,
  delete: (id: number) => void,
  onClick: () => void
}

interface IEditCategoriesFormState {
  name: string,
  display: DisplayStatus,
  id: number,
  ok: boolean
}

class EditCategoriesForm extends React.PureComponent<IEditCategoriesFormProps, IEditCategoriesFormState> {
  constructor(props: IEditCategoriesFormProps) {
    super(props);
    this.state = {name: "", display: DisplayStatus.CreateNewCategory, id: 0, ok: false}
  }

  componentDidMount() {
    this.setState({...this.state, id: parseInt(Object.keys(this.props.categories.data)[0])});
  }

  componentDidUpdate() {
    this.setState({...this.state, id: parseInt(Object.keys(this.props.categories.data)[0])});
  }

  handleInput = (e: any) => {this.setState({...this.state, [e.target.name]: e.target.value}); }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.state.display === DisplayStatus.CreateNewCategory ? this.props.create(this.state.name) :
      this.props.update({newName: this.state.name, id: this.state.id});
    this.setState({...this.state, ok: true});
    setTimeout(() => this.setState({...this.state, ok: false}), 1000)
  }

  changeDisplay = (status: DisplayStatus) => {
    this.setState( {...this.state, display: status} );
  }

  render() {
    console.log(this.props);
    if (this.state.display === DisplayStatus.CreateNewCategory) {
      return (
        <div className="edit_categories_frame">
          <div className='edit_categories_btns'>
            <button className="change_edit_categories_display_btn" onClick={() => this.changeDisplay(DisplayStatus.EditCategory)}> Edit category </button>
            <button className="frame_close_btn" onClick={this.props.onClick}>x</button>
          </div>
          <form onSubmit={this.handleSubmit} className="edit_categories_form">
            <div>
              <label htmlFor='name'> New category name: <br/> <br/></label>
              <input size={15} className="new_category_name_input" type='text' name='name' value={this.state.name} onChange={this.handleInput} />
            </div>
            <input className="change_edit_categories_display_btn submit_btn" type="submit" value="Submit" />
            {this.state.ok ? <p className="ok"> OK </p> : null}
          </form>
        </div>
      )
    } else if (Object.keys(this.props.categories.data).length > 0) {
      return (
        <div className="edit_categories_frame">
          <div className='edit_categories_btns'>
            <button className="change_edit_categories_display_btn" onClick={() => this.changeDisplay(DisplayStatus.CreateNewCategory)}> Create new category </button>
            <button className="frame_close_btn" onClick={this.props.onClick}>x</button>
          </div>
          <form onSubmit={this.handleSubmit} className="edit_categories_form">
            <select value={this.state.id} name="id" onChange={this.handleInput}>
              {
                Object.keys(this.props.categories.data).map(cur => {
                  console.log(cur);
                  return <option key={cur} value={cur}> {this.props.categories.data[cur].name}</option>
                })
              }
            </select>
            <input type="button" className="btn" onClick={() => this.props.delete(this.state.id)} value="delete" />
            <div>
              <label htmlFor='name'> Edit category name to: <br/> </label>
              <input type='text' name='name' value={this.state.name} onChange={this.handleInput} />
            </div>
            <input className="change_edit_categories_display_btn submit_btn" type="submit" value="Submit" />
            {this.state.ok ? <p className="ok"> OK </p> : null}
          </form>
        </div>
      )} else {
        return (
        <div className="edit_categories_frame">
          <div className='edit_categories_btns'>
            <button className="change_edit_categories_display_btn" onClick={() => this.changeDisplay(DisplayStatus.CreateNewCategory)}> Create new category </button>
            <button className="frame_close_btn" onClick={this.props.onClick}>x</button>
          </div>
          <p> please, create a category before editing </p>
        </div>)
      }
  }
}

const mapStateToProps = (state: any) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    create: (newName: string) => dispatch(api.category.create(newName)),
    update: (payload: {id: number, newName: string}) => dispatch(api.category.update(payload)),
    delete: (id: number) => dispatch(api.category.delete(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoriesForm)

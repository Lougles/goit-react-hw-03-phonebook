import React, {Component} from 'react';
import Form from '../Form/Form';
import ListItem from '../ListItem/ListItem';
import Find from '../Find/Find';

class App extends Component {
  state = {
    filter: '',
    contacts: [],
  }
  formSubmitHandler = data => {
    if (this.state.contacts.some(item => item.name === data.name)) {
      alert(`${data.name} is already exsist in contact`);
      return;
    } else if (data.name.length < 3) { 
      alert(`Имя не может быть меньше 3 букв`)
      return;
    }
    else if (data.number.length < 3) {
      alert(`Номер не может быть меньше 3 цифр`)
      return;
    }
    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, data],
      }
    });
  }
  onDelete = (event) => {
    const id = event.target.id;
    this.setState((prevState) => ({
      contacts: [...prevState.contacts.filter(item => 
        item.id !== id
    )]
    }))
  }
    handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({filter: value});
    };
  getFilterItems = () => {
    return this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) { 
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('Произошли изменения');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const visibleContacts = this.getFilterItems();
    return (
      <div>
        <h1>Phonebook</h1>
        <Form
          onSubmit={this.formSubmitHandler}
        />
        <h2>Contacts</h2>
        <Find
          filter={this.state.filter}
          handleChange={this.handleChange}
        />
        <ListItem
          contacts={visibleContacts}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}

export default App;

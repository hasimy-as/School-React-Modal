import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import Header from './Header';

class App extends Component {
  constructor() {
    super();
    this.state = { yalli: [], modalOpened: false, modalData: [], key: [] };

    this.openModal = this.openModal.bind(this);
    this.afterOpened = this.afterOpened.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  addData = e => {
    e.preventDefault();

    let hour = this.refs.hour.value;
    let act = this.refs.act.value;

    this.state.yalli.push({ hour, act });
    this.setState({ yalli: this.state.yalli });

    this.refs.form.reset();
  };

  removeData = i => {
    this.state.yalli.splice(i, 1);
    this.setState({ yalli: this.state.yalli });
  };

  openModal(data, i) {
    console.log(i);
    this.setState({ key: i });
    this.setState({ modalData: data });
    this.setState({ modalOpened: true });
  }

  afterOpened() {
    this.subtitle.style.color = '#333';
    let data = this.state.modalData;

    this.refs.hour_edit.value = data.hour;
    this.refs.activity_edit.value = data.act;
  }

  closeModal() {
    this.setState({ modalOpened: false });
  }

  saveData = a => {
    a.preventDefault();
    let hour = this.refs.hour_edit.value;
    let act = this.refs.activity_edit.value;
    let key = this.state.key;
    this.state.yalli.splice(key, 1, { hour, act });
    this.setState({ yalli: this.state.yalli, modalData: [] });
    this.setState({ modalOpened: false });
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: 27 + 'px' }} className='App'>
          <Header />
        </div>
        <div className='col-md-4 oyalliset-4'>
          <form ref='form' className='form-horizontal'>
            <div className='form-group mx-sm-3 mb-2'>
              <input
                type='time'
                ref='hour'
                placeholder='Activity time'
                className='form-control mb-2'
              />
              <input
                type='text'
                ref='act'
                placeholder='Activity'
                className='form-control'
              />
            </div>
            <div className='form-group mx-sm-3 mb-2'>
              <button
                style={{
                  marginTop: 20 + 'px',
                  marginLeft: 45 + '%'
                }}
                onClick={this.addData}
                className='btn btn-info btn-flat'
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <hr />
        <div className='col-md-4 oyalliset-5'>
          <ul className='list-group'>
            {this.state.yalli.map((data, i) => (
              <li className='list-item' key={i}>
                <div className='ml-2'>
                  {data.hour} == {data.act}
                </div>
                <div className='row mt-3 ml-4'>
                  <button
                    className='btn btn-info mx-sm-2 mb-2'
                    onClick={() => this.openModal(data, i)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger mx-sm-2 mb-2'
                    onClick={() => this.removeData(i)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Modal
          isOpen={this.state.modalOpened}
          onAfterOpen={this.afterOpened}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
          <h2
            className='text-center'
            ref={subtitle => (this.subtitle = subtitle)}
          >
            Edit data
          </h2>

          <div className='text-center'> Edit here </div>
          <form ref='formedit' className='form-horizontal'>
            <div className='form-group mx-sm-3 mb-2'>
              <input
                type='time'
                ref='hour_edit'
                placeholder='Activity time'
                className='form-control mb-2 mt-3'
              />
              <input
                type='text'
                ref='activity_edit'
                placeholder='Activity'
                className='form-control'
              />
            </div>
            <div className='row oyalliset-2'>
              <button onClick={this.saveData} className='btn btn-info btn-flat'>
                Save
              </button>
              <button
                className='btn btn-primary ml-2 btn-flat'
                onClick={this.closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;

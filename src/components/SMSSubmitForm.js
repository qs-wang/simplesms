import React, { Component } from 'react';
import { SMSFormErrors } from './SMSFormErrors';
import './SMSSubmitForm.css';
import config from '../config';

class SMSSubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: config.app.testPhoneNumber || '',
        messages: JSON.stringify(['hi'])
      },
      submitting: false,
      error: false,
      formErrors: { to: '', messages: '' },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.clearError = this.clearError.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  clearError() {
    this.setState({
      formErrors: {
        to: '',
        messages: ''
      }
    })
  }

  validateInput() {
    if (!this.state.message.to) {
      this.setState({
        formErrors: {
          to: 'must input a phone number'
        }
      })
      return false;
    }

    if (!this.state.message.messages) {
      this.setState({
        formErrors: {
          messages: 'must input the messages as json format'
        }
      })
      return false;
    }


    if (this.state.message.messages) {
      try {
        const messages = JSON.parse(this.state.message.messages);

        if (!Array.isArray(messages)) {
          this.setState({
            formErrors: {
              messages: 'must be json string array'
            }
          })
          return false;
        } else {
          if (messages.length > 3) {
            this.setState({
              formErrors: {
                messages: 'Can only send 3 messages per time'
              }
            })
            return false;
          }
        }
      } catch (error) {
        this.setState({
          formErrors: {
            messages: 'must be json format'
          }
        })
        return false;
      }
    }

    return true;
  }

  onSubmit(event) {
    event.preventDefault();
    this.clearError();
    if (!this.validateInput()) {
      return;
    };

    this.setState({ submitting: true });
    fetch('sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: this.state.message.to,
        messages: JSON.parse(this.state.message.messages)
      })
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            error: false,
            submitting: false,
          });
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          formErrors: {
            //TODO: show some good format string
            messages: JSON.stringify(data.body)
          }
        })

      });
  }

  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
        <div className="panel panel-default">
          <SMSFormErrors formErrors={this.state.formErrors} />
        </div>
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            name="messages"
            id="messages"
            rows="10"
            value={this.state.message.messages}
            onChange={this.onHandleChange}
          />
        </div>
        <button type="submit" disabled={this.state.submitting}>
          Send message
        </button>
      </form>
    );
  }
}

export default SMSSubmitForm;

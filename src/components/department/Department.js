import React, { Component } from 'react';
import './Department.css';

export default class Exams extends Component {

  render() {
    /*  */
    const isactive = this.props.visible ? 'department__table' : 'department__hidden';
    const plusminus = this.props.visible ? '-' : '+';
    return (
      <section className="department">
        <span onClick={this.props.activeClick} >{plusminus} {this.props.heading}</span>
        <table className={isactive}>
          <tbody>
            <tr>
              <th> Auðkenni </th>
              <th> Námskeið </th>
              <th> Fjöldi </th>
              <th> Dagsetning </th>
            </tr>
            {
              this.props.tests.map((test, index) => (
                <tr key={index} className='department__table__data'>
                  <td> {test.course} </td>
                  <td> {test.name} </td>
                  <td> {test.students} </td>
                  <td> {test.date} </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

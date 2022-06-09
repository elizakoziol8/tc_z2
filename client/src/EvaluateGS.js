import React, { Component } from 'react';
import axios from 'axios';

class EvaluateGS extends Component {
  state = {
    indexes: [],
    values: [],
    k: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/history');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const indexes = await axios.get('/api/values/all');
    console.log(indexes)
    this.setState({
      indexes: indexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      k: this.state.k,
    });
    this.setState({ k: '' });
  };

  renderSeenIndexes() {
    return this.state.indexes.map(({ k }) => k).join(', ');
  }

  renderValues() {
    const entries = [];

    this.state.values.forEach(ent => {
      entries.push(
        <div key={ent["k"]}>
          Dla współczynnika k = {ent["k"]}, obliczony {ent["k"]}-ty wyraz ciągu to {ent["result"]}
        </div>
      )
    })
    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Wprowadź współczynnik ciągu k:</label> <br />
          <input
            value={this.state.k}
            onChange={(event) => this.setState({ k: event.target.value })}
          />
          <button>Zatwierdź</button>
        </form>

        <h3>5 ostatnich wprowadzonych współczynników k</h3>
        {this.renderSeenIndexes()}

        <h3>5 ostatnich obliczeń dla ciągu o pierwszym wyrazie = 2</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default EvaluateGS;

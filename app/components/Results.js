import React from 'react'
import queryString from 'query-string'

import api from '../utils/api'
import Loading from './Loading'

import { Link } from 'react-router-dom'


import PlayerPreview from './PlayerPreview'



function Profile (props) {
  let {login, avatar_url, name, location, company, followers, following, public_repos, blog } = props.info;

  return (
    <PlayerPreview username={login} avatar={avatar_url}>
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: React.PropTypes.object.isRequired,
}

function Player ({label, score, profile}) {
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  profile: React.PropTypes.object.isRequired,
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  componentDidMount() {
    let players = queryString.parse(this.props.location.search);

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (players) {
      if (players === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false,
          }
        });
      }

      this.setState(function () {
        return {
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false,
        }
      });
    }.bind(this));
  }
  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    if (loading === true) {
      return <Loading />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results
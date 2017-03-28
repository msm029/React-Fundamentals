var React = require('react');
var api = require('../utils/api');
var Loading = require('./Loading');

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        });
      }.bind(this));
  }
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
      <div>
        <ul className='languages'>
          {languages.map(function (lang) {
            return (
              <li
                style={lang === this.state.selectedLanguage ? {color: '#d0021b'} : null}
                onClick={this.updateLanguage.bind(this, lang)}
                key={lang}>
                  {lang}
              </li>
            )
          }.bind(this))}
        </ul>
        {!this.state.repos
          ? <Loading />
          : <ul className='popular-list'>
              {this.state.repos.map(function (repo, index) {
                return (
                  <li key={repo.name} className='popular-item'>
                    <div className='popular-rank'>#{index + 1}</div>
                    <ul className='minimal-list'>
                      <li><img className='avatar' src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login}/></li>
                      <li><a href={repo.html_url}>{repo.name}</a></li>
                      <li>@{repo.owner.login}</li>
                      <li>{repo.stargazers_count} stars</li>
                    </ul>
                  </li>
                )
              })}
            </ul>}
      </div>
    )
  }
}

module.exports = Popular;
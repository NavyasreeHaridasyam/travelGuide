import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EachPackage from '../EachPackage'

import './index.css'

class TravelGuide extends Component {
  state = {placesList: [], isLoading: false}

  componentDidMount() {
    this.getTravelPlaces()
  }

  renderFormattedData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  getTravelPlaces = async () => {
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedList = fetchedData.packages.map(eachPackage =>
        this.renderFormattedData(eachPackage),
      )
      console.log(updatedList)
      this.setState({
        placesList: updatedList,
        isLoading: false,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="position">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPlacesView = () => {
    const {placesList} = this.state
    return (
      <ul className="places-list-container">
        {placesList.map(eachPlace => (
          <EachPackage eachPlace={eachPlace} key={eachPlace.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="travel-guide-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr className="separator" />
        {isLoading ? this.renderLoader() : this.renderPlacesView()}
      </div>
    )
  }
}

export default TravelGuide

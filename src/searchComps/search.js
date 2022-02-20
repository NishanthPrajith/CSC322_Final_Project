import './search.css';

import { useFood } from "../contexts/foodContext";


export default function MainSearch() {

    const { filteredFoodItems } = useFood();

    return (
        <div className='search'>
            <div>
                <p className="searchHeading">Highest Rated Dishes</p>
                {
                    filteredFoodItems.map((item) => {
                        return (
                            <div key={item.name}>
                                <p>{ item.name }</p>
                                <p>{ item.email }</p>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <p className="searchHeading">Popular Dishes</p>
                {
                    filteredFoodItems.map((item) => {
                        return (
                            <div key={item.name}>
                                <p>{ item.name }</p>
                                <p>{ item.email }</p>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <p className="searchHeading">Search Results..</p>
                {
                    filteredFoodItems.map((item) => {
                        return (
                            <div key={item.name}>
                                <p>{ item.name }</p>
                                <p>{ item.email }</p>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
  }
  
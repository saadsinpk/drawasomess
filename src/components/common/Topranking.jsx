import axios from "axios";
import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";
import Social from './Social';

function Topranking({popuptext}) {
    const [randomQuote, setRandomQuote] = useState('');
const data = {
    "TopRanking": [
      {
        "id": 1,
        "title": "JuliusB",
        "time": "5.32"
      },
      {
        "id": 2,
        "title": "Babybluejeff",
        "time": "5.49"
      },
      {
        "id": 3,
        "title": "Deannak",
        "time": "5.60"
      },
      {
        "id": 4,
        "title": "ZoeyElle",
        "time": "5.80"
      },
      {
        "id": 5,
        "title": "PatrickG",
        "time": "5.80"
      },
      {
        "id": 6,
        "title": "SCurry",
        "time": "6.23"
      },
      {
        "id": 7,
        "title": "Henryfortune66",
        "time": "25.10"
      },
      {
        "id": 8,
        "title": "Kimp",
        "time": "25.11"
      },
      {
        "id": 9,
        "title": "LOLDoll",
        "time": "28.39"
      },
      {
        "id": 10,
        "title": "Strangerthings",
        "time": " 29.90"
      },
      {
        "id": 11,
        "title": "Sleepnow",
        "time": " 29.90"
      },
      {
        "id": 12,
        "title": "Nicolecarter",
        "time": " 29.90"
      },
      {
        "id": 13,
        "title": "CJ",
        "time": " 29.91"
      },
      {
        "id": 14,
        "title": "Xaden",
        "time": " 29.92"
      },
      {
        "id": 15,
        "title": "Yvette",
        "time": " 29.98"
      },
      {
        "id": 16,
        "title": "Barbie11",
        "time": " 30.01"
      },
      {
        "id": 17,
        "title": "SantaElf",
        "time": " 30.03"
      },
      {
        "id": 18,
        "title": "RudolphDo",
        "time": " 30.04"
      },
      {
        "id": 19,
        "title": "BlairDash",
        "time": " 30.05"
      },
      {
        "id": 20,
        "title": "Snacktime1149",
        "time": " 30.10"
      },
      {
        "id": 21,
        "title": "Hulksmasher",
        "time": " 30.15"
      },
      {
        "id": 22,
        "title": "Presidentlincoln",
        "time": " 30.16"
      },
      {
        "id": 23,
        "title": "Lemonadeisyummy",
        "time": " 30.20"
      },
      {
        "id": 24,
        "title": "Jimmy",
        "time": " 30.22"
      },
      {
        "id": 25,
        "title": "Scotthyver31",
        "time": " 30.25"
      },
      {
        "id": 26,
        "title": "KlayT",
        "time": " 30.50"
      },
      {
        "id": 27,
        "title": "DrayGreen",
        "time": " 30.71"
      },
      {
        "id": 28,
        "title": "Stevescott",
        "time": " 30.80"
      },
      {
        "id": 29,
        "title": "prancer1",
        "time": " 30.90"
      },
      {
        "id": 30,
        "title": "JadyCakes",
        "time": " 40.00"
      }
  
    ]
}
    // const update = () => {
    //     axios.get("https://phpstack-896782-3112621.cloudwaysapps.com/")
    //         .then((res) => {
    //             setRandomQuote(res.data);
    //         });
    // };

    // useEffect(update, []);
    // console.log(randomQuote)

    // if (!randomQuote) return null;
  return (
    <div  className={'StatisticsMain Topranking'}>
     <div className="StatisticsMain-top p-2 flex items-center">
         <div className="StatisticsMain-top-left">
             <AiOutlineArrowLeft />
         </div>
         <h2 className="heading-right mx-auto my-0">{popuptext}</h2>
     </div>
     <div className='section1'>
   
            <div className="section1__list mt-5">
                <ul className='list'>
                {data.TopRanking.map(TopRanking => {
        return (
            <li key={TopRanking.id} className='flex justify-between items-center'>
                        <div className="section1__list-left">
                            <span>{TopRanking.id}.</span>{TopRanking.title}
                        </div>
                        <div className="section1__list-right">
                            {TopRanking.time}
                        </div>
                        </li>
        );
      })}
                  
                   
                </ul>
            </div>
            <div className="section1Box section1Box3 my-2">
            <div className='flowBox text-center'>
                <h2 className='mb-2'>Follow us below</h2>
                <Social />
            </div>
            </div>
     </div>
     </div>
  )
}

export default Topranking
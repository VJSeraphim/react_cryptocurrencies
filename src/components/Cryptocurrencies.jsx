import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins)

    const filteredData = cryptosList?.data?.coins.filter(
      (coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase().includes(searchTerm))
    )

    setCryptos(filteredData)
  }, [cryptosList, searchTerm])
  

  if ( isFetching ) return <Loader />

  return (
    <>
      {!simplified && (
        <div className="search-crypto"> 
          <input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((cur) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={cur.uuid}>
            <Link to={`/crypto/${cur.uuid}`} key={cur.uuid}>
              <Card 
                title={`${cur.rank}. ${cur.name}`} 
                extra={<img className="crypto-image" src={cur.iconUrl} />}
                hoverable
              >
                <p>
                  Price: {millify(cur.price)}
                </p>
                <p>
                  Market Cap: {millify(cur.marketCap)}
                </p>
                <p>
                  Daily Change: {cur.change}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
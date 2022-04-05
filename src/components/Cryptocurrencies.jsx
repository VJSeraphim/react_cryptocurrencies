import React, { useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = () => {
  const { data: cryptoList, isFetching } = useGetCryptosQuery()
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins)

  return (
    <>
      <Row gutters={[32, 32]} className="crypto-card-container">
        {cryptos.map((cur) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={cur.id}>
            <Link to={`/crypto/${cur.id}`}>
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
                  Daily Change: {millify(cur.change)}
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
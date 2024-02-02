import { Card } from 'primereact/card';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <div className="card">
            <Card title="Page contact">
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
                <Link to="/profile" className="p-button font-bold">Profile</Link>
            </Card>
        </div>
    </div>
  )
}

export default Home

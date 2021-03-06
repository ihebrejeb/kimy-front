import React from 'react' ; 
import './Landing.css' ;
import { useHistory } from 'react-router-dom';


function LandingPage() {
    const history = useHistory();
    return (
    <div> 
        <div className="nav">
              <img className="nav_img" src="/logo.png" alt="kimiy"/>


              <div className="navigation">

                  <p className="screens">Features</p>
                  <p className="screens">pricing</p>
                  <p className="screens">contact</p>

        
              </div>
             
                 
                 <button className="signin" onClick={()=> history.push('/login')} > Sign Up </button>
            
            
        </div>

        <div className="content">
            <div className="title"> 
                 <h1>  K.I.M.Y  </h1>
                <h1 className="classroom" > Smart Virtual Classroom</h1>
            </div>
           
            <p className="paragraphe"> K.I.M.Y is a digital E-Learning  plateform created to help learners from different  backgrounds improve their communication among each other in a safe and easy  environment </p>
            
         

         <div className="buttons">
             <button className="button"> start free trial</button>
             <button className="button_learn"> learn more </button>
         </div>
         </div>

     </div>



        


    )
}

export default LandingPage

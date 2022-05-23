import React, { Component } from 'react';
import Button from '@mui/material/Button';




class TestComponent extends Component {
    //const alert = useAlert()

    constructor({gun}) {
        super()

        this.name = "PetitZoulou"


        
        this.gun = gun;
        this.userG = gun.user().recall({ sessionStorage: true })
        
        console.log("Nvx Component : ")
        // this.gun.get('users').on(function(data, key){
        //     console.log(data)
        // })
    }


    afficher = () => {
        console.log("Nvx Afficher Component : ")
        // this.gun.get('users').on(function(data, key){
        //     console.log(data)
            
        // })                                                                                                                                               
    }

    signin = () => {
        const self = this
        this.userG.auth("marius", "testtest", function (at) {

            // this.state.connected = true
            // console.log("test in sign in ",usernameTampSignIn)

        })
    }

    render() {
        return (
            
        <div>
            <Button onClick={this.signin}> 
                Afficher
            </Button>
        </div>
        )
    }
}

export default TestComponent;
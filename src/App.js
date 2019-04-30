import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Select from 'react-select'


const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
]

class App extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            pass: '',
            title: '',
            login: false,
            menu: null,
            page: '',
            type: '',
            number: '',
            objname: '',
            objnationalCode: '',
            objaddress: null,
            objeMailAddress: null,
            objlastName: null,
            objnumbers: []
        }

    }


    loginOnClick() {
        let options = {
            method: 'POST',
            url: 'http://localhost:8080/ws/login?user=' + this.state.user + '&pass=' + this.state.pass,
            'content-type': 'application/x-www-form-urlencoded',
            withCredentials: true,
        };

        axios(options)
            .then((response) => {
                if (response.data.status === 'Ok') {
                    this.setState({
                        login: true,
                        menu: response.data.responseObject.menu
                    });
                } else if (response.data.status === 'Error') {
                    this.setState({title: response.data.exception.fullMessage});
                } else {
                    this.setState({title: "خطا در برقراری ارتباط با سرور"});
                }
            })
            .catch((e) => {
                this.setState({title: "خطا در برقراری ارتباط با سرور"});
            });
    }

    render() {
        return (
            <div className="App">
                {(this.state.login === true) ?
                    this.mainPage()
                    :
                    this.loginPage()}
            </div>
        );
    }

    menuOnClick(menuitem) {
        if (menuitem.type === "PAGE")
            this.setState({page: menuitem.page.url});
    }

    renderMenu(menu) {

        let str = [];

        menu.children.forEach((menuitem) => {
            str.push(
                <button onClick={this.menuOnClick.bind(this, menuitem)}>
                    {menuitem.title}
                </button>);
            if (menuitem.type === "MENU")
                str.push(this.renderMenu(menuitem));
        });

        return str;
    }

    mainPage() {
        return <header className="App-header">
            {this.renderMenu(this.state.menu)}
            {this.renderPage()}
        </header>
    }

    renderPage() {
        switch (this.state.page) {
            case 'addAccount':
                return this.addAccountPage();
            case 'addLegal':
                return this.addLegalPage();
            case 'addReal':
                return this.addRealPage();
            default:
                return null
        }
    }

    handleNumberInput = () => {
        objnumbers: this.state.objnumbers.push({number: this.state.number, type: this.state.type})

    };
    addAccountPage(){
        return <div>
            {(this.state.title === '') ?
                null
                : <label>{this.state.title}</label>
            }
            <label>
                <br/><br/>
                كد:
                <input type="text" name="code" value={this.state.objcode}
                       onChange={(e) => this.setState({objcode: e.target.value})}/>
                <br/>
                مبلغ :
                <input type="text" name="accountAmount" value={this.state.objaccountAmount}
                       onChange={(e) => this.setState({objaccountAmount: e.target.value})}/>

            </label>
            <button onClick={this.addAccountOnClick.bind(this)}>
                ADD
            </button>
        </div>
    }
    addRealPage() {


        return <div>
            {(this.state.title === '') ?
                null
                : <label>{this.state.title}</label>
            }
            <label>
                <br/><br/>
                نام:
                <input type="text" name="name" value={this.state.objname}
                       onChange={(e) => this.setState({objname: e.target.value})}/>
                <br/>
                نام خانوادگي:
                <input type="text" name="lastName" value={this.state.objlastName}
                       onChange={(e) => this.setState({objlastName: e.target.value})}/>
                <br/>
                كدملي:
                <input type="text" name="nationalCode" value={this.state.objnationalCode}
                       onChange={(e) => this.setState({objnationalCode: e.target.value})}/>
                <br/>
                ايميل:
                <input type="text" name="eMailAddress" value={this.state.objeMailAddress}
                       onChange={(e) => this.setState({objeMailAddress: e.target.value})}/>
                <br/>
                آدرس:
                <input type="text" name="address" value={this.state.objaddress}
                       onChange={(e) => this.setState({objaddress: e.target.value})}/>
                <br/>

                شماره تلفن:
                <br/>
                شماره:
                <input type="text" name="numbers" value={this.state.number}
                       onChange={(e) => this.setState({number: e.target.value})}/>
                <br/>
                نوع:
                <input type="text" name="type" value={this.state.type}
                       onChange={(e) => this.setState({type: e.target.value})}/>
                <br/>
                <button onClick={this.handleNumberInput.bind(this)}>add number</button>

            </label>
            <button onClick={this.saveRealOnClick.bind(this)}>
                ADD
            </button>
        </div>
    }

    addLegalPage() {
        return <div>
            {(this.state.title === '') ?
                null
                : <label>{this.state.title}</label>
            }
            <label>
                نام :
                <input type="text" name="name" value={this.state.objname}
                       onChange={(e) => this.setState({objname: e.target.value})}/>
                <br/>
                نام خانوادگي :
                <input type="text" name="openingDate" value={this.state.objopeningDate}
                       onChange={(e) => this.setState({objopeningDate: e.target.value})}/>
                <br/>
                كد ثبت :
                <input type="text" name="registrationCode" value={this.state.objregistrationCode}
                       onChange={(e) => this.setState({objregistrationCode: e.target.value})}/>
                <br/>
                ايميل :
                <input type="text" name="eMailAddress" value={this.state.objeMailAddress}
                       onChange={(e) => this.setState({objeMailAddress: e.target.value})}/>
                <br/>
                آدرس :
                <input type="text" name="address" value={this.state.objaddress}
                       onChange={(e) => this.setState({objaddress: e.target.value})}/>
                <br/>
                <br/>
                شماره تلفن:
                <br/>
                شماره:
                <input type="text" name="numbers" value={this.state.number}
                       onChange={(e) => this.setState({number: e.target.value})}/>
                <br/>
                نوع:
                <input type="text" name="type" value={this.state.type}
                       onChange={(e) => this.setState({type: e.target.value})}/>
                <br/>
                <button onClick={this.handleNumberInput.bind(this)}>add number</button>

            </label>
            <button onClick={this.saveLegalOnClick.bind(this)}>
                ADD
            </button>
        </div>
    }

    saveLegalOnClick() {
        let obj = {
            name: this.state.objname,
            lastName: this.state.objlastName,
            registrationCode: this.state.objregistrationCode,
            eMailAddress: this.state.objeMailAddress,
            address: this.state.objaddress,
            numbers: this.state.objnumbers
        };


        let options = {
            method: 'POST',
            url: 'http://localhost:8080/ws/addLegalContact',
            'content-type': 'application/json',
            withCredentials: true,
            data: obj
        };

        axios(options)
            .then((response) => {
                if (response.data.status === 'Ok') {
                    this.setState({title: "ok"});
                } else if (response.data.status === 'Error') {
                    this.setState({title: response.data.exception.fullMessage});
                } else {
                    this.setState({title: "خطا در برقراری ارتباط با سرور"});
                }
            })
            .catch((e) => {
                this.setState({title: "خطا در برقراری ارتباط با سرور"});
            });
    }

    saveRealOnClick() {
        let obj = {
            name: this.state.objname,
            lastName: this.state.objlastName,
            nationalCode: this.state.objnationalCode,
            eMailAddress: this.state.objeMailAddress,
            address: this.state.objaddress,
            numbers: this.state.objnumbers
        };


        let options = {
            method: 'POST',
            url: 'http://localhost:8080/ws/addRealContact',
            'content-type': 'application/json',
            withCredentials: true,
            data: obj
        };

        axios(options)
            .then((response) => {
                if (response.data.status === 'Ok') {
                    this.setState({title: "ok"});
                } else if (response.data.status === 'Error') {
                    this.setState({title: response.data.exception.fullMessage});
                } else {
                    this.setState({title: "خطا در برقراری ارتباط با سرور"});
                }
            })
            .catch((e) => {
                this.setState({title: "خطا در برقراری ارتباط با سرور"});
            });
    }
    addAccountOnClick() {
        let obj = {
            code: this.state.objcode,
            accountAmount: this.state.objaccountAmount
        };


        let options = {
            method: 'POST',
            url: 'http://localhost:8080/ws/addAccount',
            'content-type': 'application/json',
            withCredentials: true,
            data: obj
        };

        axios(options)
            .then((response) => {
                if (response.data.status === 'Ok') {
                    this.setState({title: "ok"});
                } else if (response.data.status === 'Error') {
                    this.setState({title: response.data.exception.fullMessage});
                } else {
                    this.setState({title: "خطا در برقراری ارتباط با سرور"});
                }
            })
            .catch((e) => {
                this.setState({title: "خطا در برقراری ارتباط با سرور"});
            });
    }
    loginPage() {
        return (<header className="App-header">{(this.state.title === '') ?
            null
            : <label>{this.state.title}</label>
        }

            <label>
                user:
                <input type="text" name="user" value={this.state.user}
                       onChange={(e) => this.setState({user: e.target.value})}/>
            </label>
            <br/>
            <label>
                pass:
                <input type="text" name="pass" value={this.state.pass}
                       onChange={(e) => this.setState({pass: e.target.value})}/>
            </label>
            <br/>
            <button onClick={this.loginOnClick.bind(this)}>
                login
            </button>
        </header>);
    }
}

export default App;

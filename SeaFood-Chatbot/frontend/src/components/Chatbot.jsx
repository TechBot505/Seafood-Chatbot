import React , {Component} from "react";
import PropTypes  from 'prop-types'
import ChatBot, {Loading} from 'react-simple-chatbot';
import styles from "./Chatbot.module.css"
import axios from 'axios';


class Openai extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            result: '',
            trigger: false,
        };

        this.triggerNext = this.triggerNext.bind(this);
    }

    componentWillMount() {
        const self = this;
        const {steps} = this.props;
        const search = steps.search.value;
        console.log(search)
        const fetchData = async() => {
            const chatBot_url = "http://localhost:3000/chat";
            
            await axios.post(chatBot_url,{search}).then((res)=>{
                console.log("Hi")
                const data = res.data;
                console.log(data)
                if(data){
                    self.setState({
                        loading: false,
                        result: data
                    });
                }else{
                    self.setState({
                        loading:false, 
                        result: 'Not found'
                    });
                }
                }).catch((err)=>{
                console.log(err);
            })
        }

        fetchData();
    }
    triggerNext(){
        this.setState({trigger: true}, ()=>{
            this.props.triggerNextStep();
        });
    }


    render() {
        const {trigger, loading, result} = this.state;

        return(
            <div>
                {loading ? <Loading /> : result}
                {
                    !loading && (
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: 20,
                            }}
                        ></div>

                    )
                }
                {
                    !trigger &&  this.setState({trigger: true},()=>{
                        this.props.triggerNextStep();
                    })
                }
            </div>
        );
    }
        
}

Openai.propTypes = {
    steps: PropTypes.object,
    triggerNextStep : PropTypes.func,
};

Openai.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

const Chatbot = () => {
    return(
        <div className={styles.chatbot} >
            <ChatBot steps={
                [
                    {
                        id: '1',
                        message: 'How may I help you',
                        trigger: 'search'
                    },
                    {
                        id: 'search',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '2',
                        message: 'Anythig else is required',
                        trigger: 'search',
                    },
                    {
                        id:'3',
                        component: <Openai />,
                        asMessage:true,
                        waitAction: true,
                        trigger: 'search',
                    }
                ]
            } />
            <div>

            </div>
        </div>
    )
}

export default Chatbot;



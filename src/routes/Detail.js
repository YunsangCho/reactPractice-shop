import {useState, useEffect, } from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding: 10px;
`

// let NewBtn = styled.button(YellowBtn)`
    
// `

function Detail(props){


    // useEffect(()=>{ })       //1.재렌더링마다 코드실행

    // useEffect(()=>{ }, [])   //2.mount시 1회 코드실행

    // useEffect(()=>{          //3.useEffect안의 코드 실행 전에 항상 실행
    //     return ()=> {

    //     }
    // }, [])                       

    // useEffect(()=>{          //4.컴포넌트 unmount시 1회 실행
    //     return ()=> {

    //     }
    // }, [])                   

    // useEffect(()=>{ }, [state1])//5.state1이 변경될 때만 실행



    let [alert1, setAlert] = useState(true);
    let [count, setCount] = useState(0);
    let [num, setNum] = useState(0);

    let {id} = useParams();
    let data = props.shoes;
    var dataId;
    data.map((a)=>{
        if(a.id == id){
            dataId = a.id;
        }
    })

    useEffect(() => {
        // for(var i = 0 ; i < 10000; i++){
        //     console.log(i);
        // }
        let a = setTimeout(()=>{setAlert(false)}, 2000);
        
        return() =>{
            //useEffect 동작전에 실행되는 부분 (clean up function)
            //(참고) clean up function은 mount시 실행안됨 unmount시 실행됨
            //ex)기존 타이머는 제거해주세요~~
            console.log(1)
            clearTimeout(a);
        }

    }, [])
    
    useEffect(()=>{
        if(isNaN(num) == true){
            alert("그러지 마세요.");
        }
    }, [num]);


    return(
        <div className="container">
            {alert1 == true ?
            <div className="alert alert-warning">
                2초이내 구매시 할인
            </div>
            : null
            }

            {/* <YellowBtn bg="blue">버튼</YellowBtn>
            <YellowBtn bg="red">버튼</YellowBtn> */}

            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[dataId].title}</h4>
                    <p>{props.shoes[dataId].content}</p>
                    <p>{props.shoes[dataId].price}</p>

                    <input onChange={(e)=>{setNum(e.target.value)}}/>

                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )

}

export default Detail;
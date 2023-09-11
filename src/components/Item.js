import './Item.css';
import { FaTrashAlt,FaRegEdit } from "react-icons/fa";
export default function Item(props){
    const{data,deleteTask,editTask} = props;
    return (
        <div className='list-item'>
            <p className='title'>{data.title}</p>
            <div className='button-container'>
                <FaTrashAlt className='btn' onClick={()=>deleteTask(data.id)}/>
                <FaRegEdit className='btn' onClick={()=>editTask(data.id)}/>
            </div>
        </div>
    );
}
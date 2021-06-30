import { Button } from "../components/Button";
import LogoImg from '../assets/images/logo.svg';
import '../styles/room.scss';
import { RoomCode } from "../components/RoomCode";
import { useParams } from 'react-router-dom'
import {  useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);
 

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <div>
          <RoomCode code={roomId} />  
          <Button isOutlined>Encerrar Sala </Button>
          </div>    
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          {questions.length > 0 && <span> {questions.length} perguntas. </span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>

      </main>
    </div>
  );
}
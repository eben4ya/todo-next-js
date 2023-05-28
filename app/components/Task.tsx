'use client';
import { FormEventHandler, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { ITask } from "@/types/tasks";
import { deleteTodo, editTodo } from "@/api";
import { useRouter } from "next/navigation";

interface TaskProps {
    task : ITask
}

const Task: React.FC<TaskProps> = ({task}) => {
    const router = useRouter();
    const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
    const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault(); // agar page tidak reload ulang
        await editTodo({
            id : task.id,
            text: taskToEdit
        });
        setTaskToEdit('');
        setModalOpenEdit(false);
        router.refresh();
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setModalOpenDelete(false);
        router.refresh();
    }

    return (
        <tr key={task.id}>
            <td className="w-full">{task.id}</td>
            <td className="flex gap-5">
                <FiEdit
                onClick={() => setModalOpenEdit(true)} 
                cursor="pointer"
                className="text-blue-500" size={25}/> 
                <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                    {/* Menambahkan children */}
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit Task</h3>
                        <div className="modal-action">
                            <input
                            value={taskToEdit}
                            onChange={e => setTaskToEdit(e.target.value)}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full" />
                            <button 
                            type="submit"
                            className="btn">Submit</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2
                onClick={() => setModalOpenDelete(true)}
                cursor="pointer"
                className="text-red-500" size={25}/>
                <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
                    <h3 className="text-lg">Are you sure, you want to delete this task ?</h3>
                    <div className="modal-action">
                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="btn"
                        >Yes</button>
                    </div>
                </Modal>
            </td>
        </tr>
  );
};

export default Task;
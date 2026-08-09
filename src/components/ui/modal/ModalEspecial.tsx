import { useState } from "react";
import { Modal } from "./Modal";

export const ModalEspecial = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setIsOpenModal}>Ver</button>
            <Modal
                isOpen={isOpenModal}
                onClose={()=> setIsOpenModal(false)}
            >
                <h2>Contenido especial.-</h2>
            </Modal>
        </div>
    )
}
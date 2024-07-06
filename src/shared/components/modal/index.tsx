import { IModelProsp } from "./interface";
import "./styles.scss";

export const Modal: React.FC<IModelProsp> = ({ children, isOpen, toggle }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="close">
              <span onClick={toggle}>x</span>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

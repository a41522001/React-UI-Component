
import { useState } from 'react';
import Dialog from '../components/Dialog';

const DialogPage = () => {
  const [isOpen, SetIsOpen] = useState(false);
  const handleOpen = (): void => {
    SetIsOpen(true);
  }
  const handleClose = (): void => {
    SetIsOpen(false);
  }
  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose} width={1000} disableOverlayClick>
        <div className='p-3'>
          <div className='flex justify-between'>
            <p>你好1231</p>
            <button className='border py-1 px-2 rounded cursor-pointer' onClick={handleClose}>點我關閉</button>
          </div>
        </div>
      </Dialog>
      <button className='border py-1 px-2 rounded cursor-pointer' onClick={handleOpen}>點我開啟dialog</button>
    </>
  )
}
export default DialogPage;
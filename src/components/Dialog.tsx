import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
interface Prop {
  children: React.ReactNode; // dialog內的內容
  isOpen: boolean; // 是否開啟dialog
  onClose: () => void; // 關閉dialog函式
  width?: number | string; // dialog寬度
  disableOverlayClick?: boolean; // 點擊外層關閉dialog
}
const Dialog = ({
  children,
  isOpen,
  onClose,
  width = 'auto',
  disableOverlayClick = false,
}: Prop) => {
  const portalRoot = document.getElementById('dialog-root') as HTMLElement;
  const [dialogWidth, setDialogWidth] = useState('');
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      width === 'auto' ||
      (typeof width === 'string' && width.includes('px'))
    ) {
      setDialogWidth(width);
    } else if (typeof width === 'number') {
      setDialogWidth(`${width}px`);
    }
  }, [width]);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        !disableOverlayClick &&
        dialogRef.current &&
        !dialogRef.current!.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, [isOpen, onClose, disableOverlayClick]);

  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, [isOpen, onClose]);

  // 新增狀態來控制動畫的「可見」class
  const [showDialogContent, setShowDialogContent] = useState(false);
  // 新增狀態來控制整個 overlay 的顯示/隱藏，用於動畫完成後再移除 DOM
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    let showTimer: number | undefined;
    let hideTimer: number | undefined;

    if (isOpen) {
      setShouldRender(true); // 讓 Portal 被渲染到 DOM
      // 在 Portal 渲染到 DOM 後，稍微延遲，然後添加 visible class
      showTimer = setTimeout(() => {
        setShowDialogContent(true);
      }, 50); // 這個小延遲很重要，讓瀏覽器有時間應用初始的 scale-0
    } else {
      setShowDialogContent(false); // 移除 visible class，觸發關閉動畫
      // 等待動畫播放完畢（700ms）再將 Portal 從 DOM 移除
      hideTimer = setTimeout(() => {
        setShouldRender(false); // 在動畫結束後才移除 Portal
      }, 700); // 這裡的 700ms 必須和你的 CSS duration-700 匹配
    }

    // 清理定時器
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]); // 只監聽 isOpen 的變化

  if (!isOpen || !portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="b-dialog-container">
      <div
        ref={dialogRef}
        className={clsx('b-dialog', {
          'b-dialog-visible': showDialogContent,
        })}
        style={{ width: dialogWidth }}
      >
        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default Dialog;

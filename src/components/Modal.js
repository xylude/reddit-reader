import React from 'react'
import ReactDOM from 'react-dom'

export function Modal({ onClickOutside, visible, style, children }) {
    return visible ? ReactDOM.createPortal(
        <div
            style={{
                position: 'absolute',
                zIndex: 100,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                height: '100%',
                width: '100%',
                cursor: onClickOutside ? 'pointer' : 'default',
                overflow: 'scroll',
            }}
            onClick={() => {
                console.log('clicked');
                onClickOutside && onClickOutside();
            } }
        >
            <div
                style={{
                    backgroundColor: '#000',
                    opacity: .7,
                    height: '100%',
                    width: '100%',
                    position: 'fixed',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: 50,
                    width: '100%',
                    marginBottom: 50,
                }}
            >
                <div
                    style={{
                        ...style,
                        padding: 10,
                        backgroundColor: '#333',
                        margin: '0 auto',
                        cursor: 'default',
                    }}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    { children }
                </div>
            </div>
        </div>,
        document.body,
    ) : null;
}
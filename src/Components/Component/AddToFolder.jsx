import { useEffect, useState } from 'react';
import '../CSS/AddToFolder.css';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export default function AddToFolder(props) {

    const [checkedFolders, setCheckedFolders] = useState([]);
    const [uncheckedFolders, setUncheckedFolders] = useState([]);
    const [component, setComponent] = useState('none');
    const [newFolderName, setNewFolderName] = useState('');

    useEffect(() => {
        // Get all the folders which includes the opened file (file which the user has opened in either NotesShowPage or CanvasShowPage).
        // Note: This variable will contain only those folders which include the opened file.
        setCheckedFolders([...props.fileFolder]);

        setComponent(props.state);
    }, [])

    const toggleFileInFolder = (key) => {

        // In this function, we will try to toggle the folders which includes the file.
        // A list of folders will be shown to the user. This list will include 'all' the folders created by the user.
        // Those folders which includes this file will be marked as checked otherwise will be marked with add icon.
        // If the user clicked on a checked folder, it means that the user is trying to remove this file from this checked folder. Vice-versa for unchecked folder.
        // So if the user clicked on a checked folder, remove the file from it otherwise add the file to it.

        // If the collection of checkedFolders include the folder clicked by the user, remove it from checked and add it to unchecked and vice-versa.
        if (checkedFolders.includes(key)) {
            setUncheckedFolders([...uncheckedFolders, key]);
            setCheckedFolders(checkedFolders.filter(el => el !== key));
        } else {
            setCheckedFolders([...checkedFolders, key]);
            setUncheckedFolders(uncheckedFolders.filter(el => el !== key));
        }
    }

    const updateFolder = () => {

        // Send the array of checked and unchecked folder to the global UpdateFolder Function to get updated accordingly.
        props.updateFolderData({ use: 'add', array: checkedFolders, fileKey: props.fileKey, callBack: props.closeComponent() });
        props.updateFolderData({ use: 'remove', array: uncheckedFolders, fileKey: props.fileKey, callBack: props.closeComponent() });
    }

    const createFolder = () => {
        const folder = {
            name: newFolderName,
            elements: [props.fileKey],
            type: 'folder',
            key: uuidv4().replaceAll('-', ''),
            date: new Date().toString()
        }

        // Send the update type, element and the callback function to the global updateFolder function to create a new folder.
        props.updateFolderData({ use: 'create', folder: folder, callBack: props.closeComponent() });
    }

    return (
        <section id='addToFolderOuter'>
            <SwitchTransition>
                <CSSTransition key={component} timeout={500} classNames="slideDown" unmountOnExit>

                    {component === 'update' ?

                        <div id="addToFolderInner" className={props.folderData ? "full" : "empty"}>

                            <div id="addToFolderHead">
                                <h4>Add or Remove:</h4>
                                <button className="btns" onClick={props.closeComponent}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"></path></svg>
                                </button>
                            </div>

                            <ul id="addToFolderBody">
                                {props.folderData.map(el => (

                                    <li key={el.key} className={`updateFolderTile ${checkedFolders.includes(el.key) ? 'checked' : ''}`} onClick={() => toggleFileInFolder(el.key)}>
                                        <div className="updfltileLeft">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M64 64C46.3 64 32 78.3 32 96V416c0 17.7 14.3 32 32 32H448c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H291.9c-17 0-33.3-6.7-45.3-18.7L210.7 73.4c-6-6-14.1-9.4-22.6-9.4H64zM0 96C0 60.7 28.7 32 64 32H188.1c17 0 33.3 6.7 45.3 18.7l35.9 35.9c6 6 14.1 9.4 22.6 9.4H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"></path></svg>
                                        </div>

                                        <div className="updfltileMiddle">{el.name}</div>

                                        <div className="updfltileRight">
                                            {checkedFolders.includes(el.key) ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M64 64C46.3 64 32 78.3 32 96V416c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM331.3 203.3l-128 128c-6.2 6.2-16.4 6.2-22.6 0l-64-64c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L192 297.4 308.7 180.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M384 64c17.7 0 32 14.3 32 32V416c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"></path></svg>
                                            }
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div id="addToFolderFoot">
                                {props.folderData.length &&
                                    <button className="bigBtns" onClick={updateFolder}>Update Folder</button>
                                }
                                <button className="bigBtns" onClick={() => setComponent('new')}>Create New Folder</button>
                            </div>
                        </div>

                        :

                        component === 'new' &&

                        <div id="newFolderInner">

                            <div id="newFolderHead">
                                <span id="newFolderHLeft"></span>

                                <span id="newFolderHMiddle">
                                    <input type="text" value={newFolderName} autoFocus spellCheck="false" className="input" placeholder='Title' onChange={e => setNewFolderName(e.target.value)} />
                                </span>

                                <span id="newFolderHRight">
                                    <button className="btns" onClick={props.closeComponent}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"></path></svg>
                                    </button>
                                </span>
                            </div>

                            <div id="newFolderBody">
                                <li className="updateFolderTile checked">
                                    <div className="updfltileLeft">
                                        {props.fileType === 'note' ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z"></path><path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z"></path></svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"></path></svg>
                                        }
                                    </div>

                                    <div className="updfltileMiddle">{props.fileName}</div>

                                    <div className="updfltileRight">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M64 64C46.3 64 32 78.3 32 96V416c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM331.3 203.3l-128 128c-6.2 6.2-16.4 6.2-22.6 0l-64-64c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L192 297.4 308.7 180.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                                    </div>
                                </li>
                            </div>

                            <div id="newFolderFoot">
                                {newFolderName.length < 3 ?
                                    <button className="bigBtns disable">Create Folder</button>
                                    :
                                    <button className="bigBtns" onClick={createFolder}>Create Folder</button>
                                }
                            </div>
                        </div>
                    }

                </CSSTransition>
            </SwitchTransition>
        </section>
    )
}

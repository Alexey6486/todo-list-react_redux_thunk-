import React, {useReducer} from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
// import {v1} from 'uuid';
// import {InputComponent} from "./InputComponent";
// import {Grid, AppBar, IconButton, Typography, Button, Toolbar, Paper} from "@material-ui/core";
// import MenuIcon from '@material-ui/icons/Menu';
// import {makeStyles} from '@material-ui/core/styles';
// import {
//     tdlsReducer,
//     RemoveTdlAC,
//     AddTdlAC,
//     EditTdlNameAC,
//     FilterValuesType,
//     ChangeTdlFilterAC
// } from "./state/AllTdls-reduser";
// import {addTaskAC, removeTaskAC, tasksReducer, changeCheckboxAC, editTaskNameAC} from "./state/tasks-reducer";
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//     },
// }));
//
// function AppWithHookReducer() {
//
//     const classes = useStyles();
//
//     let tdlId01 = v1();
//     let tdlId02 = v1();
//
//     let [AllTdls, dispatchToTdlsReducer] = useReducer(tdlsReducer, [
//         {id: tdlId01, title: "tdl_01", filter: "all"},
//         {id: tdlId02, title: "tdl_02", filter: "all"},
//     ]);
//
//     let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
//         [tdlId01]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//             {id: v1(), title: "REST API", isDone: false},
//         ],
//         [tdlId02]: [
//             {id: v1(), title: "HTML&CSS_02", isDone: false},
//             {id: v1(), title: "JS_02", isDone: false},
//             {id: v1(), title: "ReactJS_02", isDone: false},
//             {id: v1(), title: "GraphQL_02", isDone: false},
//             {id: v1(), title: "REST API_02", isDone: false},
//         ],
//     });
//
//     const remTask = (tdlId: string, id: string) => {
//         const action = removeTaskAC(tdlId, id);
//         dispatchToTasksReducer(action);
//     };
//
//     const addTask = (inputValue: string, tdlId: string) => {
//         const action = addTaskAC(inputValue, tdlId);
//         dispatchToTasksReducer(action);
//     };
//
//     const changeDoneCheckbox = (taskId: string, doneStat: boolean, tdlId: string) => {
//         const action = changeCheckboxAC(taskId, doneStat, tdlId);
//         dispatchToTasksReducer(action);
//     };
//
//     const editNameTask = (tdlId: string, taskId: string, inputValue: string) => {
//         const action = editTaskNameAC(tdlId, taskId, inputValue);
//         dispatchToTasksReducer(action);
//     };
//
//     const remTdl = (tdlId: string) => {
//         const action = RemoveTdlAC(tdlId);
//         dispatchToTdlsReducer(action);
//         dispatchToTasksReducer(action);
//     };
//
//     const addTdl = (inputValue: string) => {
//         const action = AddTdlAC(inputValue);
//         dispatchToTdlsReducer(action);
//         dispatchToTasksReducer(action);
//     };
//
//     const editTdlName = (tdlId: string, inputValue: string) => {
//         const action = EditTdlNameAC(tdlId, inputValue);
//         dispatchToTdlsReducer(action);
//     };
//
//     const changeFilter = (tdlId: string, filter: FilterValuesType) => {
//         const action = ChangeTdlFilterAC(tdlId, filter);
//         dispatchToTdlsReducer(action);
//     };
//
//     let tdlsMap = AllTdls.map(tdl => {
//
//         let tasksForTodoList = tasks[tdl.id];
//
//         if (tdl.filter === "active") {
//             tasksForTodoList = tasks[tdl.id].filter(task => task.isDone === false);
//         }
//         if (tdl.filter === "completed") {
//             tasksForTodoList = tasks[tdl.id].filter(task => task.isDone === true);
//         }
//
//         return <Grid item
//                      style={{margin: "0 0 30px 0", minHeight: '286px'}}>
//
//             <Paper elevation={2}
//                    style={{padding: "15px", minHeight: 'inherit', minWidth: '250px'}}>
//
//                 <Todolist key={tdl.id}
//                           remTdl={remTdl}
//                           title={tdl.title}
//                           tdlId={tdl.id}
//                           tasks={tasksForTodoList}
//                           remTask={remTask}
//                           changeFilter={changeFilter}
//                           addTask={addTask}
//                           changeDoneCheckbox={changeDoneCheckbox}
//                           filter={tdl.filter}
//                           editNameTask={editNameTask}
//                           editTdlName={editTdlName}/>
//             </Paper>
//         </Grid>
//
//     });
//
//     return (
//
//         <div className="App">
//             <div className={classes.root}>
//                 <AppBar position="static">
//                     <Toolbar>
//                         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//                             <MenuIcon/>
//                         </IconButton>
//                         <Typography variant="h6" className={classes.title}>
//                             TDL
//                         </Typography>
//                         <Button color="inherit">Login</Button>
//                     </Toolbar>
//                 </AppBar>
//             </div>
//             <Grid container
//                   direction="row"
//                   justify="flex-start"
//                   style={{padding: "20px 30px"}}>
//
//                 <InputComponent addItem={addTdl}/>
//             </Grid>
//             <Grid container
//                   direction="row"
//                   justify="flex-start"
//                   spacing={3}
//                   alignItems="flex-start"
//                   style={{padding: "20px 30px"}}>
//
//                 {tdlsMap}
//             </Grid>
//         </div>
//     );
// }
//
// export default AppWithHookReducer;

"use client"
import classes from './page.module.css';
import LanguageSelector from '../../../components/project/createProject/LanguageSelector.js';
import QAForms from '../../../components/project/createProject/QAForm.js';
import QAForm from '../../../components/project/createProject/QAForm.js';
import TitlePage from '@/components/project/TitlePage';
import SAForm from '@/components/project/createProject/SAForm';
import { useState } from 'react';

export default function CreateProject() {
    const [formState,setFormState]=useState('Details');

    const handOnClickFormState=(state)=>{
        if(state==='Details') {
            setFormState('Details')
        } 
        
        if(state==='Status') {
            setFormState('Status')
        } 
        if(state==='Quality') {
            setFormState('Quality')
        } 
    }

    return (
        <>
            <TitlePage title="Create project" />

            <div className={classes.container}>
                <div className={classes.formContainer}>
                    <div className={classes.sidebar}>
                        <p onClick={()=>handOnClickFormState('Details')}
                         className={formState==="Details"?classes.activeTitle:classes.inActiveTitle}>Project Details</p>
                        <p onClick={()=>handOnClickFormState('Status')} 
                         className={formState==="Status"?classes.activeTitle:classes.inActiveTitle} >Project Status Automation</p>
                        <p onClick={()=>handOnClickFormState('Quality')} 
                         className={formState==="Quality"?classes.activeTitle:classes.inActiveTitle} >Quality Assurance</p>
                    </div>
                    <div className={classes.form}>
                        {formState==="Details"&&(
                        <form>
                            <div className={classes.formGroup}>
                                <label>Name *</label>
                                <input type="text" name="name" className={classes.input} required />
                            </div>
                            <div className={classes.formGroup}>
                                <label>Source language *</label>
                                <input type="text" name="sourceLanguage" className={classes.input} required />
                            </div>
                            <div className={classes.formGroup}>
                                <LanguageSelector />
                            </div>
                            <div className={classes.formGroup}>
                                <label>Due Date *</label>
                                <input type="date" name="dueDate" className={classes.input} required />
                            </div>
                            <div className={classes.formGroup}>
                                <label>Metadata *</label>
                                <textarea name="metadata" className={classes.textarea} required></textarea>
                            </div>
                        </form>
                        )}
                        {formState==="Status"&&(
                        <SAForm/>
                        )}
                        {formState==="Quality"&&(
                        <QAForm/>
                        )}


                        <button type="submit" className={classes.button}>Create project</button>
                    </div>
                </div>
            </div>


        </>
    );

}



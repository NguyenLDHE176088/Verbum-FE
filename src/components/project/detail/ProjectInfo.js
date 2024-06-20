"use client"
import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import classes from './ProjectInfo.module.css';
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProjectFromAPI } from '@/data/projects'; 
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';




export default function ProjectInfo({ id }) {

    const [data, setData]= useState({});

    const getProjectInfoById = async (projectId) => {
        try {
            const result = await getProjectFromAPI(projectId);
            if (result.success) {
                setData(result.success.data);
                console.log(result.success.data);
            } else {
                console.error('Error fetching project:', result.error);
            }
        } catch (error) {
            console.error('Error fetching project info:', error);
        }
    };

    useEffect(() => {
        getProjectInfoById(id);
    }, [id]);
    return (
        <>
            <div className={classes.projectInfoHeading}>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel>
                        <div>{data.projectName}</div>
                    </ResizablePanel>
                    <ResizablePanel>
                        <div className={classes.buttonSection}>
                            <div>
                                <Button className={classes.editButton}>
                                    <Pencil className="w-4 h-4" />
                                    <span className="ml-1">Edit</span></Button>
                            </div>
                            <div>
                                <Button variant="destructive">
                                    <Trash2 className="w-4 h-4" />
                                    <span className="ml-1">Delete</span></Button>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <div>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel>
                        <div className={classes.displaySection}>
                            <div className={classes.displayObject}>
                                <div>Created by:</div>
                                <div>{data.createBy}</div>
                            </div>
                            <div className={classes.displayObject}>
                                <div>Created:</div>
                                <div>{data.createdAt ? format(new Date(data.createdAt ), 'dd/MM/yyyy') : 'Invalid Date'}</div>
                            </div>
                            <div className={classes.displayObject}>
                                <div>Status: </div>
                                <div>{data.status}</div>
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizablePanel>
                        <div className={classes.displaySection}>
                            <div className={classes.displayObject}>
                                <div>Source language: </div>
                                <div className="flex">{
                                    data.sourceLanguage
                                     || <p>none</p>
                                }</div>
                            </div>
                            <div className={classes.displayObject}>
                                <div>Target language: </div>
                                <div className="flex">{
                                    data.targetLanguage?.map(language => (
                                        <span key={language.valueOf}>
                                            <Badge variant="secondary">{language}</Badge>
                                        </span>
                                    )) || <p>none</p>
                                }</div>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}
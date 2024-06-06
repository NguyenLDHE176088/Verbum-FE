import {
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import classes from './ProjectInfo.module.css';
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getProjectInfoById = (id) => {
    const data = {
        projectName: 'En to VN',
        createBy: 'truongpdhe170417@fpt.com.vn',
        created: 'May 13 21:00',
        status: 'new',
        sourceLanguage: [
            "EN"
        ],
        targetLanguage: [
            "VN", "JP"
        ]
    }
    return data;
}

export default function ProjectInfo({ id }) {
    const data = getProjectInfoById(id);
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
                                <div>{data.created}</div>
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
                                    data.sourceLanguage?.map(language => (
                                        <span key={language.valueOf}>
                                            <Badge variant="secondary" >{language}</Badge>
                                        </span>
                                    )) || <p>none</p>
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
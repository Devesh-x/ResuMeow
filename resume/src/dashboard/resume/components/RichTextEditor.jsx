import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';
const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);
    const GenerateSummeryFromAI = async () => {
      if (!resumeInfo?.Experience[index]?.title) {
        toast('Please Add Position Title');
        return;
      }
    
      setLoading(true);
    
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title);
    
      try {
        const result = await AIChatSession.sendMessage(prompt);
        const resp = await result.response.text(); // Await the response
    
        console.log("Raw AI Response:", resp); // Debugging output
    
        // Try parsing JSON response
        let parsedData;
        try {
          parsedData = JSON.parse(resp);
        } catch (error) {
          console.error("Failed to parse AI response as JSON:", error);
          toast('AI response format error');
          setLoading(false);
          return;
        }
    
        // Extract bullet points
        let bulletPoints = Object.values(parsedData);
    
        if (!bulletPoints || bulletPoints.length === 0) {
          toast('Invalid AI response format');
          setLoading(false);
          return;
        }
    
        // Convert bullet points to a proper HTML format
        const formattedHTML = `<ul>${bulletPoints.map(point => `<li>${point}</li>`).join('')}</ul>`;
    
        setValue(formattedHTML);
      } catch (error) {
        console.error("Error in AI request:", error);
        toast('Failed to generate summary');
      }
    
      setLoading(false);
    };
    
  
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
         
         
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
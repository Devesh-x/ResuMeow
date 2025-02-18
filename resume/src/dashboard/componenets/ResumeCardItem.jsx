import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner';

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      toast('Resume Deleted!');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    });
  };

  return (
    <div className='m-1'>
      <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
        <div className='p-4 h-[280px] w-[200px] rounded-lg border hover:shadow-lg transition-transform duration-300 transform hover:scale-110'
          style={{
            borderColor: resume?.themeColor,
            backgroundColor: '#fff', // Set a solid background color
            border: '1px solid purple', // Add purple border
          }}
        >
          <div className='flex items-center justify-center h-full overflow-hidden'>
            <img src="/cv.png" alt="Resume" className="w-full h-full object-cover" />
          </div>
        </div>
      </Link>
      <div className='p-3 flex justify-between items-center text-black rounded-lg shadow-lg w-[200px]'
        style={{
          background: resume?.themeColor,
        }}>
        <h2 className='text-sm text-black'>{resume.title}</h2> {/* Title in black color */}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate('/dashboard/resume/' + resume.documentId + "/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/my-resume/' + resume.documentId + "/view")}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/my-resume/' + resume.documentId + "/view")}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
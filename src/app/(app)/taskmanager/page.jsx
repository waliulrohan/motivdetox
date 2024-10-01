'use client'
import { Kanban } from '@/components/task-manager-components/kanban';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React from 'react';

const TaskManager = () => {

  

  return (
    <div className="w-full h-full ">
      <Kanban/>
    </div>
  );
};

export default TaskManager;

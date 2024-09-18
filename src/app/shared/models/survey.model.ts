export interface Survey {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    fields: Field[];
    creatorId: number;
    updatedAt: string;
  }
  
export interface Field {
    id: number;
    name: string;
    type: string;
    required: boolean;
  }

  
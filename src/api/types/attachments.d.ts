declare namespace Attachments {
  interface GetAnnexReq {
    expt_id?: string | number;
    step_id?: string | number;
  }

  interface GetAnnexRes {
    id: number;
    expt_id: number;
    expt_name: string;
    step_id: number;
    step_name: string;
    project_id: number;
    project_name: string;
    file_url: string;
    name: string;
    filename: string;
    description: string;
    created_at: string;
    updated_at: string;
  }
}

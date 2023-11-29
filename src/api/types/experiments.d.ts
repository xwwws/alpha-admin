declare namespace Experiments {

  type List = {
    bottle_area: Coordinates;
    bottle_height: number;
    created_at: string;
    description: string;
    id: string | number;
    name: string;
    status: string;
  };
  type ExpInfoAttachments = {
    id: number;
    expt_id: number;
    expt_name: string;
    step_id: number;
    step_name: string;
    created_at: string;
    description: string;
    file_url: string;
    filename: string;
    name: string;
    updated_at: string;
  }
  type ExperimentDetailsRes = {
    attachments: ExpInfoAttachments[];
    id: string | number;
    project_id: string | number;
    name: string;
    bottle_area: Coordinates;
    recycle_area: Coordinates;
    bottle_height: 0;
    steps_data: CreateExperimentStep[];
    status: string;
    data_acquisitions: data_acquisitionParams[];
    data_acquisitions_results: DataAcquisitionsResults[];
    description: string;
  };

  type ExperimentRecordRes = {
    id: string | number;
    action: string;
    args: string[];
    start_time: string;
    end_time: string;
    label: string;
    result: any[];
  };

  interface ExperimentStepsRes {
    id: string | number;
    step_data: ExperimentStepsResItem[];
  }

  type ExperimentStepsResItem = {
    id: string | number;
    start_time: string;
    end_time: string;
    duration: string;
    reagent_name: string;
    expt_id: number;
    reagent_id: number;
    status: string;
    content: {
      speed: string | number;
      weight: string | number;
      accuracy: string | number;
      dst_area: Coordinates;
      src_area: Coordinates;
    };
    result: string[];
    name: string;
    label: string;
    quantity_plan: number;
    quantity_real: number;
    data_acquisitions: data_acquisitionParams[];
    data_acquisitions_results: DataAcquisitionsResults[];
    step_description: string;

  };

  //  实验状态
  interface ExperimentStatus {
    status: 'draft' |
      'waiting' |
      'doing' |
      'succeed' |
      'failed' |
      'canceled';
  }

  // 创建实验步骤
  interface CreateExperimentStep {
    name: string;
    data_acquisitions?: IAcquisitions[];
    reagent_id?: string | number;
    reagent_name?: string | number;
    kwargs: AddSolid & Pipette & AddSolvent & Mix3Step & DoPeristalticStep;
  }

  interface IAcquisitions {
    nodeid: string | number;
    interval: string | number;

  }

  // 创建实验
  interface CreateExperimentReq {
    name: string;
    project_id: string | number;
    bottle_area: Coordinates;
    recycle_area?: Coordinates;
    bottle_height: string | number;
    data_acquisitions?: IAcquisitions[];
    steps_data: CreateExperimentStep[];
  }

  interface CreateExperimentRes extends CreateExperimentReq, ExperimentStatus {
    id: string | number;
  }

  interface UploadExpAnnex {
    name: string;
    file: any;
    description: string;
  }

}

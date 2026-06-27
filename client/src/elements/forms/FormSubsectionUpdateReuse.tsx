import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonCandidateDetailsReset,
  ButtonCandidateDetailsSubmit,
} from '../../pages/group_profile/ProfileCandidates/elements/buttons';
import { select_input_field } from './handlers/select_input_field';
import { default_date_format } from './utils/constants';


export function FormSubsectionUpdateReuse<T extends { created_at: Date | string; updated_at: Date | string; is_active: boolean }>({
  sect_state,
  form_schema,
  submit_handler,
  form_structure,
  form_title = '',
  form_subtitle = '',
}: {
  sect_state: T | null;
  form_schema: any;
  submit_handler: (data: any) => void;
  form_structure: any;
  form_title?: string;
  form_subtitle?: string;
}): JSX.Element {

  //  remarks: extracted react hook form methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: sect_state || { is_active: true },
    resolver: yupResolver(form_schema),
  });

  //  remarks: update saved values and reset form when sect_state changes (exclude reset from deps)
  useEffect(() => {
    if (sect_state) {
      reset({
        ...sect_state,
        is_active: String(sect_state.is_active),
      });
    } else {
      const empty: any = {};
      Object.keys(form_structure).forEach((key) => {
        if (key === 'is_active') {
          empty[key] = 'true';
        } else {
          empty[key] = '';
        }
      });
      reset(empty);
    }
  }, [sect_state, reset, form_structure]);

  const handleReset = () => {
    if (sect_state) {
      reset({
        ...sect_state,
        is_active: String(sect_state.is_active),
      });
    } else {
      const empty: any = {};
      Object.keys(form_structure).forEach((key) => {
        if (key === 'is_active') {
          empty[key] = 'true';
        } else {
          empty[key] = '';
        }
      });
      reset(empty);
    }
  };
  //
  const entries = Object.entries(form_structure);
  const rows = [];
  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2));
  }
  //  remarks: display
  return (
    <form className="mt-4" onSubmit={handleSubmit(submit_handler)}>
      {/*  box: title + description */}
      <div className="mb-4 py-1">
        <h3 className="font-bold text-lg">{form_title}</h3>
        <p className="text-gray-500 text-md">{form_subtitle}</p>
      </div>
      {/*  box: input fields  */}
      {rows.map((row, index) => (
        <div key={index} className="flex flex-col gap-2 md:flex-row">
          {row.map(([name, config]) => (
            <div key={name} className={`${row.length === 1 ? 'md:w-1/2 w-full' : 'flex-1'} min-w-0`}>
              {select_input_field(name, config, register, errors)}
            </div>
          ))}
        </div>
      ))}
      {/*  box: button for form control  */}
      <div className="flex justify-end gap-4 mt-4">
        <ButtonCandidateDetailsReset reset={handleReset} />
        <ButtonCandidateDetailsSubmit />
      </div>
    </form>
  );
}


















// remarks: Input form for the section - candidate details

// export function FormCandidateDetails({
//   targetCandidate,
// }: {
//   targetCandidate: ICandidate | null;
// }): JSX.Element {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<any>({
//     defaultValues: targetCandidate || {},
//     resolver: yupResolver(UpdateCandidateSchema),
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     if (targetCandidate) {
//       reset({
//         ...targetCandidate,
//         created_at: new Date(targetCandidate.created_at).toLocaleString(
//           'en-GB',
//           default_date_format
//         ),
//         updated_at: new Date(targetCandidate.updated_at).toLocaleString(
//           'en-GB',
//           default_date_format
//         ),
//       });
//     }
//   }, [targetCandidate, reset]);

//   return (
//     <form
//       className="mt-4"
//       onSubmit={handleSubmit((data) => handle_candidate_details_submit(id as string, data))}
//     >
//       <div>
//         {/* row 0: identifier */}
//         <div className="flex flex-col gap-2 md:flex-row">
//           <div className="flex-1 min-w-0">
//             <FormTextField
//               type="text"
//               label="Identifier"
//               register={register('_id')}
//               error={errors._id as any}
//               isDisabled={true}
//               required={false}
//             />
//           </div>
//           <div className="flex-1 min-w-0" />
//         </div>
//         {/* row 1: first name + last name */}
//         <div className="flex flex-col gap-2 md:flex-row">
//           <div className="flex-1 min-w-0">
//             <FormTextField
//               type="text"
//               label="First Name"
//               placeholder="Insert keywords..."
//               register={register('first_name')}
//               error={errors.first_name as any}
//               isDisabled={false}
//               required={false}
//             />
//           </div>
//           <div className="flex-1 min-w-0">
//             <FormTextField
//               type="text"
//               label="Last Name"
//               placeholder="Insert keywords..."
//               register={register('last_name')}
//               error={errors.last_name as any}
//               isDisabled={false}
//               required={false}
//             />
//           </div>
//         </div>
//         {/* row 2: gender + email */}
//         <div className="flex flex-col gap-2 md:flex-row">
//           <div className="flex-1 min-w-0">
//             <FormSelectInput
//               label="Gender"
//               options={Object.entries(enum_gender).map(([key, value]) => ({
//                 value: value,
//                 label: key.charAt(0).toUpperCase() + key.slice(1),
//               }))}
//               register={register('gender')}
//               error={errors.gender as any}
//               isDisabled={false}
//               required={false}
//             />
//           </div>
//           <div className="flex-1 min-w-0">
//             <FormTextField
//               type="email"
//               label="Email"
//               register={register('email')}
//               error={errors.email as any}
//               isDisabled={false}
//               required={false}
//             />
//           </div>
//         </div>
//         {/* row 3: candidate stage and active status */}
//         <div className="flex flex-col gap-2 md:flex-row">
//           <div className="flex-1 min-w-0">
//             <FormSelectInput
//               label="Candidate Stage"
//               options={Object.entries(enum_prob_status).map(([key, value]) => ({
//                 value: value,
//                 label: key.charAt(0).toUpperCase() + key.slice(1),
//               }))}
//               register={register('prob_status')}
//               error={errors.prob_status as any}
//               isDisabled={false}
//               required={false}
//               placeholder={PLACEHOLDER_SELECT}
//             />
//           </div>
//           <div className="flex-1 min-w-0">
//             <FormSelectInput
//               label="Active Status"
//               options={[
//                 { value: 'true', label: 'True' },
//                 {
//                   value: 'false',
//                   label: 'False',
//                 },
//               ]}
//               register={register('is_active')}
//               error={errors.is_active}
//               isDisabled={false}
//               required={false}
//               placeholder={PLACEHOLDER_SELECT}
//             />
//           </div>
//         </div>
//         {/* row 4: created at and updated at */}
//         <div className="flex flex-col gap-2 md:flex-row">
//           <div className="flex-1 min-w-0">
//             <FormTextField
//               type="text"
//               label="Created at"
//               register={register('created_at')}
//               error={errors.created_at}
//               isDisabled={true}
//               required={false}
//             />
//           </div>
//           <div className="flex-1 min-w-0">
//             <FormTextField
//               type="text"
//               label="Updated at"
//               register={register('updated_at')}
//               error={errors.updated_at}
//               isDisabled={true}
//               required={false}
//             />
//           </div>
//         </div>
//         {/* button box */}
//         <div className="flex justify-end gap-4 mt-4">
//           <ButtonCandidateDetailsReset reset={reset} />
//           <ButtonCandidateDetailsSubmit />
//         </div>
//       </div>
//     </form>
//   );
// }


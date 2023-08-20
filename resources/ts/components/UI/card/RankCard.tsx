import React from 'react'

interface UserRankCardInterface
{
    rankColor?: string
    rankLabel?: string
    rankLevel?: number;
    children?: React.ReactNode;
    onSelectChange?: (data: any, actionMeta: any) => void
    value?: string | null
}

export const UserRankCard = (props: UserRankCardInterface) => {

    const onChange = (data: any, actionMeta: any) => {
        props.onSelectChange && props.onSelectChange(data, actionMeta);
    }

    return (
        <>
            <div className='flex flex-1 flex-col justify-center min-h-full shadow p-3 rounded-md border'>
                {/* <div className='flex flex-col justify-center relative text-center pb-4'>
                    <Image className={'w-10'} width={50} height={60} src='/img/Group-747.png' />
                    <p>کاربر فاکینگ طلایی</p>
                </div> */}
                <div className='flex flex-1 flex-col w-full relative'>
                    <div className='flex flex-1 justify-between'>
                        <span className='text-xs py-1 text-gray-700'>امتیاز کاربر</span>
                        <span className='text-xs py-1 text-gray-700'>12500</span>
                    </div>
                    <div className='ping w-full h-fit border rounded'>
                        <div className='bg-primary h-1 rounded shadow' style={{width: '70%'}}></div>
                    </div>
                </div>

                <div className='flex flex-1 w-full grow '>
                    {/*<Select value={props.value} onChange={onChange}  placeholder="انتخاب کنید..." className='w-full' label='ارتقاء کاربر'/>*/}
                </div>
                
            </div>
        </>
            
    )
}
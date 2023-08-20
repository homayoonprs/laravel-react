import { queryStringToObject, cs } from '@/utils/helpers';
import React, {createElement} from 'react'
import { paginationMetaLinkType } from '@/types/IPaginationMeta';
import { IPagination } from './IPagination';
import styles from './Pagination.module.scss'

const  Pagination = (props: IPagination) => {

    const handleOnPageClick = (event: React.MouseEvent<HTMLDivElement>, link: paginationMetaLinkType & {pageNumber?: number}) => {
      if(link.url != null){
        let pageNumber = queryStringToObject(link.url).page
        
        link = {...link, pageNumber: parseInt(pageNumber)};
      }
      props.onPageClick(props.paginationMeta.meta, link)
    }
    
    return (
      <div
        className={cs(
          styles.container,
          props.containerClassName ? props.containerClassName : ''
        )}
      >
        {props.paginationMeta.meta.links.map(link => (
          <div
            onClick={e => handleOnPageClick(e,link)}
            className={cs(
              link.active ? styles.active : '',
              link.url == null ? styles.disable : '',
              props.paginatorClassName ? props.paginatorClassName : '',
              styles.paginator
            )}
          >
            {link.label}
          </div>
        ))}
      </div>
    )

}

export default Pagination;
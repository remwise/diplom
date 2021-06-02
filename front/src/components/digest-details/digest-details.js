import React, { useEffect } from 'react';
import { Divider, Loader, Timeline } from 'rsuite';
import { observer } from 'mobx-react-lite';

import './digest-details.css';

import { getStore as getDigestStore } from '../../stores/digest';

const digestStore = getDigestStore();

const DigestDetails = observer(({ active }) => {
  useEffect(() => {
    digestStore.getDigest({ digest_id: active });
  }, [active]);

  if (!digestStore.digest || digestStore.loading) return <Loader center size="lg" />;

  const sections = (
    <ul>
      {digestStore.digest.map(el => {
        const { articles } = el;

        const artList =
          articles.length !== 0 ? (
            articles.map(article => {
              const { user } = article;

              function getName({ surname, name, patronymic }) {
                return patronymic ? `${surname} ${name[0]}.${patronymic[0]}. ` : `${surname} ${name[0]}. `;
              }

              let authors = getName(user);
              authors += article.collaborators.map(user => getName(user));
              authors += article.directors.map(user => getName(user));

              // let authors = user.patronymic
              //   ? `${user.surname} ${user.name[0]}.${user.patronymic[0]}. `
              //   : `${user.surname} ${user.name[0]}. `;

              // authors += article.collaborators.map(user =>
              //   user.patronymic ? `${user.surname} ${user.name[0]}.${user.patronymic[0]}. ` : `${user.surname} ${user.name[0]}. `
              // );

              // authors += article.directors.map(user =>
              //   user.patronymic ? `${user.surname} ${user.name[0]}.${user.patronymic[0]}. ` : `${user.surname} ${user.name[0]}. `
              // );

              return (
                <div key={article.article_id}>
                  <h5>
                    {el.section_num}.{article.article_id} {authors} {article.name}
                  </h5>
                  <p>{article.description}</p>
                  <Divider />
                </div>
              );
            })
          ) : (
            <p>Докладов по данному разделу не представлено</p>
          );

        return (
          <li key={el.digest_section_id}>
            <h4>
              {el.section_num}. {el.name}
            </h4>
            {artList}
          </li>
        );
      })}
    </ul>
  );

  // const { event_id, name, registration_end, start_date, end_date, about, contacts, price, program, files } = eventStore.event;

  return (
    <div>
      <a href="/">Ссылка на сборник</a>
      {sections}
    </div>
  );
});

export default DigestDetails;

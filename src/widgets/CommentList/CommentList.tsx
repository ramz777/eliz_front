import { Collapse, CollapseProps } from "antd";
import Subjects from "stores/DB/Subjects.json";
import Teachers from "stores/DB/Teachers.json";
import Groups from "stores/DB/Groups.json";
import { CommentItem } from "widgets/CommentItem";
import styles from "./commentList.module.scss";
import { TComment } from "shared/types/comment";
import { FC } from "react";
import { Text } from "shared/Title/Title";

interface CommentListProps {
  items: TComment[];
}

export const CommentList: FC<CommentListProps> = ({ items }) => {
  const data: CollapseProps["items"] = items.map((item) => {
    const filteredSubject = Subjects.subjects.find(
      (subject) => subject.id === item.subject_id
    ).name;
    const filteredTeacher = Teachers.teachers.find(
      (teacher) => teacher.id === item.teacher_id
    ).name;
    const filteredGroup = Groups.groups.find(
      (group) => group.id === item.group_id
    ).name;

    return {
      key: item.id,
      label: `${filteredTeacher} | ${filteredSubject} |  ${filteredGroup}`,
      extra: item.date,
      children: <CommentItem text={item.reason} />,
    };
  });

  return (
    <div className={styles.commentList}>
      {data.length ? (
        <Collapse accordion items={data} />
      ) : (
        <Text>Замечаний по высталенным фильтрам не найдено</Text>
      )}
    </div>
  );
};

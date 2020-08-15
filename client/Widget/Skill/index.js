import SkillWrapper from './SkillWrapper';
import SkillSkeleton from './SkillSkeleton';
import SkillForm from './SkillForm';

const manifest = {
  type: 'Skill',
  Component: SkillWrapper,
  Fallback: SkillSkeleton,
  Form: SkillForm,
  defaultHeight: 2,
  defaultWidth: 2,
};

export default manifest;

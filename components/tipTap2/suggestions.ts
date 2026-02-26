import { ReactRenderer } from "@tiptap/react";
import tippy, {
  Instance as TippyInstance,
  Props as TippyProps,
} from "tippy.js";
import MentionList, { MentionListRef } from "./MentionList";

const suggestions = {
  items: ({ query }: { query: string }) => {
    return [
      "Lea Thompson",
      "Cyndi Lauper",
      "Tom Cruise",
      "Madonna",
      "Jerry Hall",
      "Joan Collins",
      "Winona Ryder",
      "Christina Applegate",
      "Alyssa Milano",
      "Molly Ringwald",
      "Ally Sheedy",
      "Debbie Harry",
      "Olivia Newton-John",
      "Princess Diana",
      "Kelly LeBrock",
      "Heather Locklear",
      "Goldie Hawn",
      "Mia Farrow",
      "Brooke Shields",
      "Courteney Cox",
      "Jane Seymour",
      "Janet Jackson",
      "Jane Fonda",
      "Meryl Streep",
      "Grace Jones",
      "Tasfique Rishad",
      "Tamim Hossain",
      "Montasir Zamil",
      "Nahid Hossain",
      "Al Nafeu Khan",
      "Sazzad Shakil",
    ]
      .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  },

  render: () => {
    let component: ReactRenderer<MentionListRef>;
    let popup: TippyInstance<TippyProps>[];

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: any) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup[0].hide();
          return true;
        }

        return component.ref?.onKeyDown(props) || false;
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};

export default suggestions;
